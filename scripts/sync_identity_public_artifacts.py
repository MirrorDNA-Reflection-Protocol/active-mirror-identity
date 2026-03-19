from __future__ import annotations

import argparse
import shutil
from pathlib import Path

from edge_truth_receipt import build_receipt, write_receipt


def sync_identity_public_artifacts(repo_root: Path) -> None:
    provenance_source = repo_root / "provenance.json"
    provenance_target = repo_root / "docs" / "provenance.json"
    provenance_target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(provenance_source, provenance_target)

    parser = argparse.Namespace(
        repo_root=str(repo_root),
        surface_id="mirror-seed",
        product="Mirror Seed",
        domain="id.activemirror.ai",
        origin="https://id.activemirror.ai",
        kind="static_site",
        builder="public_sync",
        served_path=["/version.json", "/.well-known/edge-truth.json"],
        watch_path=["index.html", "docs/index.html", "package.json", "provenance.json"],
        note=[
            "Public root is docs/ for GitHub Pages.",
            "provenance.json is mirrored into docs/ before publishing.",
        ],
        exclude_name=["version.json", "edge-truth.json"],
        output=[],
    )
    payload = build_receipt(parser)
    write_receipt(
        payload,
        [
            repo_root / "docs" / "version.json",
            repo_root / "docs" / ".well-known" / "edge-truth.json",
        ],
    )


def main() -> None:
    parser = argparse.ArgumentParser(description="Sync Mirror Seed public artifacts and edge-truth receipts.")
    parser.add_argument("--repo-root", default=".")
    args = parser.parse_args()
    sync_identity_public_artifacts(Path(args.repo_root).resolve())


if __name__ == "__main__":
    main()
