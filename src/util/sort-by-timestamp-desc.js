export default function sortByTimestampDesc(KEY = "updatedAt") {
  return null != KEY ? sortByTimestampDesc_.bind({ KEY }) : null;
}

function sortByTimestampDesc_(node1, node2) {
  const { KEY } = this;
  return new Date(node2[KEY]).getTime() - new Date(node1[KEY]).getTime();
}
