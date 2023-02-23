import { TestBed } from '@angular/core/testing';

import { ResolversResolver } from './resolvers.resolver';

describe('ResolversResolver', () => {
  let resolver: ResolversResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ResolversResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
