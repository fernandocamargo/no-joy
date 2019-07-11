import React, { Component, memo } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    const {
      state: { error },
      props: { children },
    } = this;

    return error ? (
      <p>
        <strong>Error:</strong> <em>{String(error.message)}</em>
      </p>
    ) : (
      children
    );
  }
}

export default memo(ErrorBoundary);
