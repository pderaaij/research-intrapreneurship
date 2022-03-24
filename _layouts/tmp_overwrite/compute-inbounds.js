"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateData = void 0;
const path_1 = require("path");
const non_nullable_1 = require("./non-nullable");
const cache_1 = require("./cache");
function hasChildInArrayExcept(node, array, except, getNode) {
  return node.children.some((id) => {
    if (id === except) {
      return false;
    }
    if (array.some((x) => x.id === id)) {
      return true;
    }
    const child = getNode(id);
    if (!child || !child.children || !child.children.length) {
      return false;
    }
    return hasChildInArrayExcept(child, array, except, getNode);
  });
}
let currentGeneration;
async function generateData(cache, getNode) {
  if (currentGeneration) {
    return currentGeneration;
  }
  currentGeneration = Promise.resolve().then(async () => {
    const nodes = await cache_1.getAllCachedNodes(cache, getNode);
    const inboundReferences = {};
    function getRef(title) {
      title =
        title.indexOf("|") > -1
          ? title.substr(0, title.indexOf("|")).replace(/\\/g, "")
          : title;
      return nodes.find(
        (x) =>
          x.title === title ||
          x.aliases.some((alias) => alias === title) ||
          (typeof x.node.fileAbsolutePath === "string" &&
            path_1.basename(
              x.node.fileAbsolutePath,
              path_1.extname(x.node.fileAbsolutePath)
            ) === title) ||
          (typeof x.node.absolutePath === "string" &&
            path_1.basename(
              x.node.absolutePath,
              path_1.extname(x.node.absolutePath)
            ) === title)
      );
    }
    await Promise.all(
      nodes
        .map((node) => {
          const mapped = node.outboundReferences.pages
            .map(getRef)
            .concat(node.outboundReferences.blocks.map(getRef))
            .filter(non_nullable_1.nonNullable)
            .map((x) => x.node.id);
          mapped.forEach((x) => {
            if (!inboundReferences[x]) {
              inboundReferences[x] = [];
            }
            inboundReferences[x].push(node.node);
          });
          return Object.assign(Object.assign({}, node), {
            resolvedOutboundReferences: mapped,
          });
        })
        .map((data) => cache_1.setCachedNode(cache, data.node.id, data))
    );
    Object.keys(inboundReferences).forEach((nodeId) => {
      inboundReferences[nodeId] = inboundReferences[nodeId].filter(
        (node) =>
          getNode(node.parent) &&
          !hasChildInArrayExcept(
            getNode(node.parent),
            inboundReferences[nodeId],
            node.id,
            // @ts-ignore
            getNode
          )
      );
    });
    const inboundReferencesId = Object.keys(inboundReferences).reduce(
      (prev, x) => {
        prev[x] = inboundReferences[x].map((y) => y.id);
        return prev;
      },
      {}
    );
    await cache_1.setInboundReferences(cache, inboundReferencesId);
    currentGeneration = undefined;
    return true;
  });
  return currentGeneration;
}
exports.generateData = generateData;
