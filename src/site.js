export function isPaperclipDocument(doc, location) {
  if (location.protocol !== "http:") return false;
  if (location.hostname !== "localhost" && location.hostname !== "127.0.0.1") return false;
  return Boolean(
    doc.querySelector('meta[name="apple-mobile-web-app-title"][content="Paperclip"]') &&
    doc.querySelector("#root"),
  );
}
