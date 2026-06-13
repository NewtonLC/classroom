import Navbar from '../../components/navbar';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import renderer from 'react-test-renderer';

describe('Navbar rendering correctly', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <SessionProvider session={{ user: { name: 'test user' } }}>
          <Navbar />
        </SessionProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Classes link for TEACHER session', () => {
    const tree = renderer
      .create(
        <SessionProvider
          session={{ user: { name: 'test user', role: 'TEACHER' } }}
        >
          <Navbar />
        </SessionProvider>
      )
      .toJSON();

    const jsonString = JSON.stringify(tree);
    expect(jsonString).toContain('Classes');
    expect(jsonString).not.toContain('Dashboard');
  });

  it('renders Dashboard link for ADMIN session', () => {
    const tree = renderer
      .create(
        <SessionProvider
          session={{ user: { name: 'admin user', role: 'ADMIN' } }}
        >
          <Navbar />
        </SessionProvider>
      )
      .toJSON();

    const jsonString = JSON.stringify(tree);
    expect(jsonString).toContain('Dashboard');
    expect(jsonString).not.toContain('Classes');
  });

  it('hides Classes link for STUDENT session', () => {
    const tree = renderer
      .create(
        <SessionProvider
          session={{ user: { name: 'student user', role: 'STUDENT' } }}
        >
          <Navbar />
        </SessionProvider>
      )
      .toJSON();

    const jsonString = JSON.stringify(tree);
    expect(jsonString).not.toContain('Classes');
    expect(jsonString).not.toContain('Dashboard');
  });

  it('hides Classes link for unauthenticated session', () => {
    const tree = renderer
      .create(
        <SessionProvider session={null}>
          <Navbar />
        </SessionProvider>
      )
      .toJSON();

    const jsonString = JSON.stringify(tree);
    expect(jsonString).not.toContain('Classes');
    expect(jsonString).not.toContain('Dashboard');
  });
});
