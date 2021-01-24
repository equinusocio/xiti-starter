const contentParser = require('./contentParser')
const normaliseEol = (str) => str.replace(/\r?\n/g, '\r\n')

// general sanity check: function(value, outputPath)
// -----------------------------------------------------------------------------
test('passes through an empty HTML', () => {
  const source = `<!DOCTYPE html>
<html><head></head><body>zzz</body></html>`
  expect(normaliseEol(contentParser(source, 'file.html'))).toBe(
    normaliseEol(source)
  )
})

// image lazy loading
// -----------------------------------------------------------------------------

test('sets image lazy loading to one image', () => {
  const source = `<!DOCTYPE html>
<html><head></head><body><main><article>
<img src="spacer.gif" width="1" height="1" alt="test spacer"/>
</article></main></body></html>`
  const desired = `<!DOCTYPE html>
<html><head></head><body><main><article>
<img src="spacer.gif" width="1" height="1" alt="test spacer" loading="lazy">
</article></main></body></html>`
  expect(normaliseEol(contentParser(source, 'file.html'))).toBe(
    normaliseEol(desired)
  )
})

test('sets image lazy loading to two images', () => {
  const source = `<!DOCTYPE html>
<html><head></head><body><main><article>
<img src="spacer1.gif" width="1" height="1" alt="test spacer"><img src="spacer2.gif" width="1" height="1" alt="test spacer">
</article></main></body></html>`
  const desired = `<!DOCTYPE html>
<html><head></head><body><main><article>
<img src="spacer1.gif" width="1" height="1" alt="test spacer" loading="lazy"><img src="spacer2.gif" width="1" height="1" alt="test spacer" loading="lazy">
</article></main></body></html>`
  expect(normaliseEol(contentParser(source, 'file.html'))).toBe(
    normaliseEol(desired)
  )
})

test('respects existing loading attributes', () => {
  const source = `<!DOCTYPE html>
<html><head></head><body><main><article>
<img src="spacer1.gif" width="1" height="1">
<img src="spacer2.gif" width="1" height="1" loading="lazy">
<img src="spacer3.gif" width="1" height="1">
</article></main></body></html>`
  const desired = `<!DOCTYPE html>
<html><head></head><body><main><article>
<img src="spacer1.gif" width="1" height="1" loading="lazy">
<img src="spacer2.gif" width="1" height="1" loading="lazy">
<img src="spacer3.gif" width="1" height="1" loading="lazy">
</article></main></body></html>`
  expect(normaliseEol(contentParser(source, 'file.html'))).toBe(
    normaliseEol(desired)
  )
})

// replaces images with title with figure and figcaption
// -----------------------------------------------------------------------------

test('sets title and figure and figcaption to an XHTML markup image', () => {
  const source = `<!DOCTYPE html>
<html><head></head><body><main><article>
<img src="spacer.gif" width="1" height="1" title="xity"/>
</article></main></body></html>`
  const desired = `<!DOCTYPE html>
<html><head></head><body><main><article>
<figure class="figure"><img src="spacer.gif" width="1" height="1" loading="lazy"><figcaption><small>xity</small></figcaption></figure>
</article></main></body></html>`
  expect(normaliseEol(contentParser(source, 'file.html'))).toBe(
    normaliseEol(desired)
  )
})

test('does not touch img tags outside <article>', () => {
  const source = `<!DOCTYPE html>
<html><head></head><body>
<img src="spacer.gif" width="1" height="1" title="xity">
</body></html>`
  expect(normaliseEol(contentParser(source, 'file.html'))).toBe(
    normaliseEol(source)
  )
})

// creates an anchor element inside each post heading
// -----------------------------------------------------------------------------

test('creates anchors inside each post heading', () => {
  const source = `<!DOCTYPE html>
<html><head></head><body><main><article>
<h1>First</h1>
<h2>Second</h2>
<h3>Third</h3>
<h4>Fourth</h4>
<h5>Fifth</h5>
<h6>Sixth</h6>
</article></main></body></html>`
  const desired = `<!DOCTYPE html>
<html><head></head><body><main><article>
<h1>First</h1>
<h2 id="second">Second<a class="permalink" href="#second">#</a></h2>
<h3 id="third">Third<a class="permalink" href="#third">#</a></h3>
<h4 id="fourth">Fourth<a class="permalink" href="#fourth">#</a></h4>
<h5 id="fifth">Fifth<a class="permalink" href="#fifth">#</a></h5>
<h6 id="sixth">Sixth<a class="permalink" href="#sixth">#</a></h6>
</article></main></body></html>`
  expect(normaliseEol(contentParser(source, 'file.html'))).toBe(
    normaliseEol(desired)
  )
})

test('does not touch the headings outside <article>', () => {
  const source = `<!DOCTYPE html>
<html><head></head><body><main>
<h1>First</h1>
<h2>Second</h2>
<h3>Third</h3>
<h4>Fourth</h4>
<h5>Fifth</h5>
<h6>Sixth</h6>
</main></body></html>`
  expect(normaliseEol(contentParser(source, 'file.html'))).toBe(
    normaliseEol(source)
  )
})

// wraps all iframes with a class
// -----------------------------------------------------------------------------

test('puts all iframes in a div container with a custom class', () => {
  const source = `<!DOCTYPE html>
<html><head></head><body><main><article>
<iframe title="Inline Frame Example" width="300" height="200" src="zzz"></iframe>
</article></main></body></html>`
  const desired = `<!DOCTYPE html>
<html><head></head><body><main><article>
<div class="iframes-wrapper"><iframe title="Inline Frame Example" width="300" height="200" src="zzz" loading="lazy"></iframe></div>
</article></main></body></html>`
  expect(normaliseEol(contentParser(source, 'file.html'))).toBe(
    normaliseEol(desired)
  )
})

test('does not touch the iframes outside the <article>', () => {
  const source = `<!DOCTYPE html>
<html><head></head><body><main>
<iframe title="Inline Frame Example" width="300" height="200" src="zzz"></iframe>
</main></body></html>`
  expect(normaliseEol(contentParser(source, 'file.html'))).toBe(
    normaliseEol(source)
  )
})

// puts all code snippets in a container
// -----------------------------------------------------------------------------

test('wraps all pre tags which have language-* class', () => {
  const source = `<!DOCTYPE html>
<html><head></head><body>
<pre class="language-css"><code>.title { color: red; }</code></pre>
</body></html>`
  const desired = `<!DOCTYPE html>
<html><head></head><body>
<div class="code-wrapper"><pre class="language-css"><code>.title { color: red; }</code></pre></div>
</body></html>`
  expect(normaliseEol(contentParser(source, 'file.html'))).toBe(
    normaliseEol(desired)
  )
})

test('does not touch pre tags without language class', () => {
  const source = `<!DOCTYPE html>
<html><head></head><body>
<pre class="lang"><code>.title { color: red; }</code></pre>
</body></html>`
  expect(normaliseEol(contentParser(source, 'file.html'))).toBe(
    normaliseEol(source)
  )
})

// adds noopener rel values on anchor hrefs
// -----------------------------------------------------------------------------

test('adds both noreferrer and noopener when neither exists', () => {
  const source = `<!DOCTYPE html>
<html><head></head><body>
<a href="http://xity-starter.netlify.app/">click me</a>
</body></html>`
  expect(contentParser(source, 'file.html')).toEqual(
    expect.stringContaining(`rel="noopener noreferrer"`)
  )
})

test('adds both noreferrer and noopener on empty rel', () => {
  const source = `<!DOCTYPE html>
<html><head></head><body>
<a href="https://xity-starter.netlify.app/" rel="">click me</a>
</body></html>`
  expect(contentParser(source, 'file.html')).toEqual(
    expect.stringContaining(`rel="noopener noreferrer"`)
  )
})

test('adds both noreferrer and noopener on rel with a whitespace value', () => {
  const source = `<!DOCTYPE html>
<html><head></head><body>
<a href="http://xity-starter.netlify.app/" rel=" ">click me</a>
</body></html>`
  expect(contentParser(source, 'file.html')).toEqual(
    expect.stringContaining(`rel="noopener noreferrer"`)
  )
})

test('adds both noreferrer and noopener on rel without a value', () => {
  const source = `<!DOCTYPE html>
<html><head></head><body>
<a href="https://xity-starter.netlify.app/" rel>click me</a>
</body></html>`
  expect(contentParser(source, 'file.html')).toEqual(
    expect.stringContaining(`rel="noopener noreferrer"`)
  )
})

test('adds only noreferrer when rel noopener exists', () => {
  const source = `<!DOCTYPE html>
<html><head></head><body>
<a href="http://xity-starter.netlify.app/" rel="noopener">click me</a>
</body></html>`
  expect(contentParser(source, 'file.html')).toEqual(
    expect.stringContaining(`rel="noopener noreferrer"`)
  )
})

test('adds only noopener when rel noreferrer exists', () => {
  const source = `<!DOCTYPE html>
<html><head></head><body>
<a href="https://xity-starter.netlify.app/" rel="noreferrer">click me</a>
</body></html>`
  expect(contentParser(source, 'file.html')).toEqual(
    expect.stringContaining(`rel="noopener noreferrer"`)
  )
})

test('does not add noopener or noreferrer when both exist', () => {
  const source = `<!DOCTYPE html>
<html><head></head><body>
<a href="http://xity-starter.netlify.app/" rel="noopener noreferrer">click me</a>
</body></html>`
  expect(contentParser(source, 'file.html')).toEqual(
    expect.stringContaining(`rel="noopener noreferrer"`)
  )
})

test('dedupes redundant noopener and noreferrer values in various letter case and normalises the whitespace', () => {
  const source = `<!DOCTYPE html>
<html><head></head><body>
<a href="https://xity-starter.netlify.app/" rel="noopener\t\tnoreferrer\t\tnoOpener\t\tnoReferrer\t\tNOOPENER\t\tNOREFERRER\t\tnOoPeNeR\t\tnOrEfErReR\t\tnoreferrer\t\tnoreferrer">click me</a>
</body></html>`
  expect(contentParser(source, 'file.html')).toEqual(
    expect.stringContaining(`rel="noopener noreferrer"`)
  )
})

test('does not add noopener or noreferrer on non-http(s) links', () => {
  const source = `<!DOCTYPE html>
<html><head></head><body>
<a href="mailto:webmaster@mozilla.com">email me</a>
</body></html>`
  expect(contentParser(source, 'file.html')).toEqual(
    expect.not.stringContaining(`rel=`)
  )
})

test('does not add noopener or noreferrer on relative links', () => {
  const source = `<!DOCTYPE html>
<html><head></head><body>
<a href="/blog/">see the blog</a>
</body></html>`
  expect(contentParser(source, 'file.html')).toEqual(
    expect.not.stringContaining(`rel=`)
  )
})
