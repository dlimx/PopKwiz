import LRU from 'lru-cache';

export const cache = new LRU({
  max: 100,
  maxAge: 1000 * 60 * 60,
});
