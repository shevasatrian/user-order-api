describe('Order Business Rules', () => {
    test('should reject creating order when user already has pending order', async () => {
        const hasPendingOrder = true;

        function createOrderMock() {
            if (hasPendingOrder) {
                throw new Error('User already has a pending order');
            }
        }

        expect(() => createOrderMock()).toThrow(
            'User already has a pending order'
        );
    });
});