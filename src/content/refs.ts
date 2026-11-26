/** Links resolve to PubMed (exact-title search lands on the article) or to the primary source. */
export const pubmed = (query: string) => `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(query)}`;
export const scholar = (query: string) => `https://scholar.google.com/scholar?q=${encodeURIComponent(query)}`;
