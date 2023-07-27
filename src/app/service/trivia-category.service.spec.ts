import { TestBed } from '@angular/core/testing';

import { TriviaCategoryService } from './trivia-category.service';

describe('TriviaCategoryService', () => {
  let service: TriviaCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TriviaCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
