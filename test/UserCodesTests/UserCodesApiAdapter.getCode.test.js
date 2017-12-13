jest.mock('request-promise');
jest.mock('login.dfe.jwt-strategies');
jest.mock('../../src/infrastructure/Config');

describe('When getting a reset code through the api', () => {
  let rp;
  let jwtGetBearerToken;

  let userCodesApiAdapter;

  beforeEach(() => {
    rp = require('request-promise');
    rp.mockReturnValue('user1');

    jwtGetBearerToken = jest.fn().mockReturnValue('some-token');
    const jwt = require('login.dfe.jwt-strategies');
    jwt.mockImplementation(jwtConfig => ({
      getBearerToken: jwtGetBearerToken,
    }));

    const config = require('./../../src/infrastructure/Config');
    config.mockImplementation(() => ({
      directories: {
        service: {
          url: 'https://directories.login.dfe.test',
        },
      },
    }));

    userCodesApiAdapter = require('./../../src/infrastructure/UserCodes/UserCodesApiAdapter');
  });

  it('then the user codes api endpoint is called', async () => {
    const userId = 'user1@test.com';

    await userCodesApiAdapter.getCode(userId);

    expect(rp.mock.calls).toHaveLength(1);
    expect(rp.mock.calls[0][0].method).toBe('GET');
    expect(rp.mock.calls[0][0].uri).toBe(`https://directories.login.dfe.test/userCodes/${userId}`);
  });
});