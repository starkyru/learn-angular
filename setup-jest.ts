// This workspace is ZONELESS (no zone.js) — the modern Angular default.
// Zoneless TestBed drives change detection via `await fixture.whenStable()`
// instead of `fixture.detectChanges()` after every mutation.
import { setupZonelessTestEnv } from 'jest-preset-angular/setup-env/zoneless';

setupZonelessTestEnv();
