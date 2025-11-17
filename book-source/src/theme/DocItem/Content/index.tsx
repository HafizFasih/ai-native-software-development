import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { ThemeClassNames } from '@docusaurus/theme-common';
import CollapsibleSummary from '@site/src/components/CollapsibleSummary';
import { useBookmarks } from '@site/src/contexts/BookmarkContext';
import { usePageContent } from '@site/src/hooks/usePageContent';
import type { Props } from '@theme/DocItem/Content';
import Heading from '@theme/Heading';
import MDXContent from '@theme/MDXContent';
import clsx from 'clsx';
import { type ReactNode, useEffect } from 'react';

/**
 Title can be declared inside md content or declared through
 front matter and added manually. To make both cases consistent,
 the added title is added under the same div.markdown block
 See https://github.com/facebook/docusaurus/pull/4882#issuecomment-853021120

 We render a "synthetic title" if:
 - user doesn't ask to hide it with front matter
 - the markdown content does not already contain a top-level h1 heading
*/
function useSyntheticTitle(): string | null {
  const {metadata, frontMatter, contentTitle} = useDoc();
  const shouldRender =
    !frontMatter.hide_title && typeof contentTitle === 'undefined';
  if (!shouldRender) {
    return null;
  }
  return metadata.title;
}

export default function DocItemContent({children}: Props): ReactNode {
  const syntheticTitle = useSyntheticTitle();
  const {isChapterPage, pagePath, pageTitle} = usePageContent();
  const doc = useDoc();
  const {setCurrentDoc} = useBookmarks();

  // Publish current doc TOC and metadata to BookmarkContext for the bookmark drawer
  useEffect(() => {
    setCurrentDoc({
      toc: doc.toc,
      metadata: {
        title: doc.metadata.title,
        permalink: doc.metadata.permalink,
      },
    });

    return () => {
      setCurrentDoc(null);
    };
  }, [doc.toc, doc.metadata.title, doc.metadata.permalink, setCurrentDoc]);

  return (
    <div className={clsx(ThemeClassNames.docs.docMarkdown, 'markdown')}>
      {syntheticTitle && (
        <header>
          <Heading as="h1">{syntheticTitle}</Heading>
        </header>
      )}
      <MDXContent>{children}</MDXContent>
      {isChapterPage && (
        <CollapsibleSummary pagePath={pagePath} pageTitle={pageTitle} />
      )}
    </div>
  );
}
