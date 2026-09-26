from __future__ import annotations

import sys
from pathlib import Path

from pypdf import PdfReader


PDF_DIR = Path(__file__).resolve().parents[1] / "pdf"
COMMON_TEXT = [
    "Vladimir Golubev",
    "wladyspb85@gmail.com",
    "+381 61 113 5426",
    "Work Experience",
    "Skills",
    "Laravel",
]
EXPECTED = {
    "Vladimir_Golubev_Overall.pdf": {
        "title": "Backend Tech Lead & Software Architect",
        "text": ["BACKEND TECH LEAD & SOFTWARE ARCHITECT"],
    },
    "Vladimir_Golubev_Tech_Lead.pdf": {
        "title": "Backend Tech Lead",
        "text": ["BACKEND TECH LEAD", "43-microservice fleet"],
    },
    "Vladimir_Golubev_Staff_Engineer.pdf": {
        "title": "Staff Backend Engineer",
        "text": ["STAFF / SENIOR BACKEND ENGINEER", "20,000 active"],
    },
    "Vladimir_Golubev_AI_Engineer.pdf": {
        "title": "AI Engineer",
        "text": ["AI ENGINEER / AI-AUGMENTED ENGINEER", "Bunchill"],
    },
}


def fail(message: str) -> None:
    print(f"ERROR: {message}", file=sys.stderr)
    raise SystemExit(1)


for filename, expected in EXPECTED.items():
    path = PDF_DIR / filename
    if not path.is_file():
        fail(f"missing generated file: {filename}")
    if path.stat().st_size > 2_500_000:
        fail(f"{filename} exceeds the 2.5 MB ATS safety limit")

    reader = PdfReader(path)
    if len(reader.pages) != 2:
        fail(f"{filename} must be exactly 2 pages, got {len(reader.pages)}")
    if not reader.trailer["/Root"].get("/StructTreeRoot"):
        fail(f"{filename} is not a tagged PDF")

    title = str((reader.metadata or {}).get("/Title", ""))
    if expected["title"] not in title:
        fail(f"{filename} has unexpected metadata title: {title!r}")

    text = "\n".join(page.extract_text() or "" for page in reader.pages)
    if len(text) < 4_000:
        fail(f"{filename} yielded too little text ({len(text)} characters)")
    for fragment in COMMON_TEXT + expected["text"]:
        if fragment not in text:
            fail(f"{filename} is missing extracted text: {fragment!r}")
    if "AI ARCHITECT" in text.upper():
        fail(f"{filename} still contains the retired AI Architect title")

    uris = set()
    for page in reader.pages:
        for annotation_ref in page.get("/Annots") or []:
            annotation = annotation_ref.get_object()
            action = annotation.get("/A") or {}
            if action.get("/URI"):
                uris.add(str(action["/URI"]))
    for required_uri in ("https://github.com/WladySpb", "https://bunchill.cc/"):
        if required_uri == "https://bunchill.cc/" and filename not in {
            "Vladimir_Golubev_Overall.pdf",
            "Vladimir_Golubev_AI_Engineer.pdf",
        }:
            continue
        if required_uri not in uris:
            fail(f"{filename} is missing link annotation: {required_uri}")

    print(f"OK: {filename} ({path.stat().st_size} bytes, {len(text)} chars)")

unexpected = sorted(
    path.name for path in PDF_DIR.glob("*.pdf") if path.name not in EXPECTED
)
if unexpected:
    fail(f"stale or unexpected PDF outputs: {', '.join(unexpected)}")

