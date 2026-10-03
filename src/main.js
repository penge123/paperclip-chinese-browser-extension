import { isPaperclipDocument } from "./site.js";
import { observePaperclip } from "./dom.js";

if (isPaperclipDocument(document, location)) observePaperclip(document);
