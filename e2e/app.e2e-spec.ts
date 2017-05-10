import { CDSSProjectPage } from './app.po';

describe('cdssproject App', () => {
  let page: CDSSProjectPage;

  beforeEach(() => {
    page = new CDSSProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
