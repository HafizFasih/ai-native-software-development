/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {type ReactNode, useState, useEffect} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {
  useAnnouncementBar,
  useScrollPosition,
} from '@docusaurus/theme-common/internal';
import {translate} from '@docusaurus/Translate';
import DocSidebarItems from '@theme/DocSidebarItems';
import type {Props} from '@theme/DocSidebar/Desktop/Content';

import styles from './styles.module.css';

function useShowAnnouncementBar() {
  const {isActive} = useAnnouncementBar();
  const [showAnnouncementBar, setShowAnnouncementBar] = useState(isActive);

  useScrollPosition(
    ({scrollY}) => {
      if (isActive) {
        setShowAnnouncementBar(scrollY === 0);
      }
    },
    [isActive],
  );
  return isActive && showAnnouncementBar;
}

export default function DocSidebarDesktopContent({
  path,
  sidebar,
  className,
}: Props): ReactNode {
  const showAnnouncementBar = useShowAnnouncementBar();

  // Listen for collapse all sections event
  useEffect(() => {
    const handleCollapseAll = () => {
      console.log('🟢 Received collapseAllSidebarSections event');

      // Find all category links (sublist items)
      const allCategoryLinks = document.querySelectorAll('.menu__link--sublist');
      console.log('📋 Total category links found:', allCategoryLinks.length);

      // Filter and collapse only expanded ones (those WITHOUT the collapsed class)
      let collapsedCount = 0;
      allCategoryLinks.forEach((categoryLink) => {
        const parent = categoryLink.parentElement;
        const isCollapsed = parent?.classList.contains('menu__list-item--collapsed');
        console.log('Category:', categoryLink.textContent?.trim(), 'isCollapsed:', isCollapsed);

        // Only click if NOT collapsed (i.e., currently expanded)
        if (parent && !isCollapsed) {
          console.log('🔽 Collapsing:', categoryLink.textContent?.trim());
          (categoryLink as HTMLElement).click();
          collapsedCount++;
        }
      });

      console.log(`✅ Collapsed ${collapsedCount} categories`);

      // Redirect to docs landing page after collapsing
      setTimeout(() => {
        console.log('🏠 Redirecting to docs landing page');
        window.location.href = '/docs/preface-agent-native';
      }, 300); // Small delay to allow collapse animation
    };

    console.log('🔵 Setting up collapseAllSidebarSections event listener');
    window.addEventListener('collapseAllSidebarSections', handleCollapseAll);

    return () => {
      console.log('🔴 Cleaning up collapseAllSidebarSections event listener');
      window.removeEventListener('collapseAllSidebarSections', handleCollapseAll);
    };
  }, []);

  return (
    <nav
      aria-label={translate({
        id: 'theme.docs.sidebar.navAriaLabel',
        message: 'Docs sidebar',
        description: 'The ARIA label for the sidebar navigation',
      })}
      className={clsx(
        'menu thin-scrollbar',
        styles.menu,
        showAnnouncementBar && styles.menuWithAnnouncementBar,
        className,
      )}>
      <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
        <DocSidebarItems items={sidebar} activePath={path} level={1} />
      </ul>
    </nav>
  );
}
