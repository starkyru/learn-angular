import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  // A pure pipe is a pure function — test the transform directly.
  describe('transform()', () => {
    const pipe = new TruncatePipe();

    it('leaves short strings untouched', () => {
      expect(pipe.transform('hello', 10)).toBe('hello');
    });

    it('truncates and appends the default ellipsis', () => {
      expect(pipe.transform('abcdefghijklmnop', 5)).toBe('abcde…');
    });

    it('trims trailing space before the ellipsis', () => {
      expect(pipe.transform('ab cdef', 3)).toBe('ab…');
    });

    it('honours a custom trailing marker', () => {
      expect(pipe.transform('abcdef', 3, '...')).toBe('abc...');
    });

    it('returns "" for null/undefined instead of throwing', () => {
      expect(pipe.transform(null)).toBe('');
      expect(pipe.transform(undefined, 5)).toBe('');
    });
  });

  // Also verify it works bound in a template.
  describe('in a template', () => {
    @Component({
      imports: [TruncatePipe],
      template: `<p>{{ text() | truncate: 4 }}</p>`,
    })
    class HostComponent {
      readonly text = signal('abcdefg');
    }

    it('renders the truncated value', async () => {
      TestBed.configureTestingModule({ imports: [HostComponent] });
      const fixture = TestBed.createComponent(HostComponent);
      await fixture.whenStable();
      expect(fixture.nativeElement.querySelector('p').textContent).toBe('abcd…');
    });
  });
});
