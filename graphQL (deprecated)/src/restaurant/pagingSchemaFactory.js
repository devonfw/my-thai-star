
function bota(input) {
  return new Buffer(input.toString(), 'binary').toString('base64');
}

function convertNodeToCursor(node) {
  return bota(node.id.toString());
}

function atob(input) {
  return new Buffer(input, 'base64').toString('binary');
}

function convertCursorToNodeId(cursor) {
  return parseInt(atob(cursor), 10);
}


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


exports.buildSchema = (inItemType) => {
  const itemType = capitalizeFirstLetter(inItemType.toLowerCase());

  return {
    schema: [`
            type ${itemType}Edge {
                node: ${itemType}
                cursor: String
            }

            type PageInfo {
                startCursor: String
                endCursor: String
                hasNextPage: Boolean
            }

            type ${itemType}Page {
                totalCount: Int
                edges: [${itemType}Edge]
                pageInfo: PageInfo
            }
        `],

    resolvers: {

    },
  };
};


exports.buildQueryResolver = inModelName => (root, { first = 10, after }, context) => {
  const modelName = capitalizeFirstLetter(inModelName.toLowerCase());
  const model = context[modelName];

  let afterIndex = -1;

    // Get ID from after argument or default to first item.
  if (typeof after === 'string') {
    const nodeId = convertCursorToNodeId(after);
    if (typeof nodeId === 'number') {
      const matchingIndex = model.findIndex(nodeId);
      if (matchingIndex !== -1) {
        afterIndex = matchingIndex;
      }
    }
  }

    // Add 1 to exclude item matching after index.
  const sliceIndex = afterIndex + 1;

  const edges = model.getRange(sliceIndex, first)
        .map(node => ({
          node,
          cursor: convertNodeToCursor(node),
        }));

  const itemsCount = model.getCount();
  const startCursor = edges.length > 0 ? convertNodeToCursor(edges[0].node) : null;
  const endCursor = edges.length > 0 ? convertNodeToCursor(edges[edges.length - 1].node) : null;
  const hasNextPage = itemsCount > sliceIndex + first;

  return {
    totalCount: itemsCount,
    edges,
    pageInfo: {
      startCursor,
      endCursor,
      hasNextPage,
    },
  };
};
