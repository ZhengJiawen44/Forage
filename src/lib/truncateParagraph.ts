const truncateParagraph = (html: string | undefined): string => {
  if (!html) {
    return "";
  }
  const parser = new DOMParser();
  const dom = parser.parseFromString(html, "text/html");
  const pList = dom.getElementsByTagName("p");
  if (pList.length === 0) {
    return "";
  }
  return pList[0].innerHTML.slice(0, 200).concat("...");
};

export default truncateParagraph;
