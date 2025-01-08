export function DOMSanitizer(richText: string): string | undefined {
  try {
    const parser = new DOMParser();
    const dom = parser.parseFromString(richText, "text/html");

    //removes script tags
    const scripts = Array.from(dom.getElementsByTagName("script"));
    scripts.forEach((script) => {
      script.parentNode?.removeChild(script);
    });

    return dom.body.innerHTML;
  } catch (error) {
    console.log("could not sanitize the folllowing: ", richText);
    console.log(error);
    return undefined;
  }
}
