# Html vs JsonMl
Html is optimised for inline. Wrapping text to bold it is a perfect example.

JsonMl is much better do declare blocks, there no need for artificial block start/end redundancy.
The problem is with inline scenarios.

### Inline in JsonMl

#### Default inline in JsonMl
```typescript
p('Example of ', b('bolded'), 'text')
```
Not easy to read.

#### Custom Template string
```typescript
p(html`Example of <b>bolded</b> text`)
```
Quite readable, but custom template add extra complexity

#### Function that returns dom
```typescript
p(html('Example of <b>bolded</b> text'))
```
Easy implement, quite readable
