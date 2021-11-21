import React from 'react';
import * as redux from 'react-redux';
import Header from '../Header';
import { render } from '@testing-library/react';

it("Header should have logo and user's name", () => {
    const spy = jest.spyOn(redux, 'useSelector')
    spy.mockReturnValue({
        isAuth: true,
        name: 'name',
        email: 'email@email.com',
        token: '1234',
        role: 'admin'
    });
    const {getByAltText, getByText} = render(<Header logoPath="testPath"></Header>);
    expect(getByAltText('Logo')).toBeInTheDocument();
    expect(getByText('Hello name')).toBeInTheDocument();
});
