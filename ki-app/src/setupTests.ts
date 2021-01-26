// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import React from 'react'

class Test extends React.Component {
    render() {
        return <p>Test paragraph.</p>;
    };

    and(a: boolean, b: boolean): boolean {
        return (a && b);
    };
}