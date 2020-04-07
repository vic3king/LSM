import trimmerMiddleware from '../../server/middlewares/trimmer.middlewares';

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

const next = jest.fn();

describe('Request Trimmer', () => {
  it('Should trim white spaces on all requests', async () => {
    const request = {
      body: {
        name: ' Karneek     ',
      },
    };
    const res = mockResponse();
    await trimmerMiddleware(request, res, next);
    expect(request.body.name).toEqual('Karneek');
    expect(next).toHaveBeenCalled();
  });
});
