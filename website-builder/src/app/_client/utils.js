import { PAGE_TYPES } from "@/app/_shared/constants";

import {
  SINGLE_IMAGE_PAGE_TEMPLATE,
  BLOG_PAGE_TEMPLATE,
  CONTACT_PAGE_TEMPLATE,
} from "@/app/_shared/page-templates";

import {
  SingleImagePageEditor,
  BlogPageEditor,
  ContactPageEditor,
} from "@/app/_client/components";

export function getEditorForPage(page) {
  if (!page) {
    return null;
  }

  return {
    [PAGE_TYPES.SINGLE_IMAGE_PAGE]: SingleImagePageEditor,
    [PAGE_TYPES.BLOG_PAGE]: BlogPageEditor,
    [PAGE_TYPES.CONTACT_PAGE]: ContactPageEditor,
  }[page.pageType];
}

export function createNewPageOfType(pageType) {
  return {
    [PAGE_TYPES.SINGLE_IMAGE_PAGE_TEMPLATE]: SINGLE_IMAGE_PAGE_TEMPLATE.clone(),
    [PAGE_TYPES.BLOG_PAGE]: BLOG_PAGE_TEMPLATE.clone(),
    [PAGE_TYPES.CONTACT_PAGE]: CONTACT_PAGE_TEMPLATE.clone(),
  }[pageType];
}
