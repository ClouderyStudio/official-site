/**
 * Node ESM resolver hook: @material/material-color-utilities ships extensionless
 * relative imports (e.g. "./dynamic_color"), which Node's ESM loader rejects but
 * bundlers accept. This hook retries those specifiers with ".js" / "/index.js".
 */
const HAS_EXT = /\.[cm]?js$|\.json$|\.node$/

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('.') && !HAS_EXT.test(specifier)) {
    try {
      return await nextResolve(specifier + '.js', context)
    } catch {}
    try {
      return await nextResolve(specifier + '/index.js', context)
    } catch {}
  }
  return nextResolve(specifier, context)
}
