import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Button from '../../../src/components/common/Button';

describe('Button Component', () => {
  it('renders correctly with title', () => {
    const {getByText} = render(<Button title="Test Button" onPress={() => {}} />);
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const {getByText} = render(<Button title="Test Button" onPress={onPress} />);
    fireEvent.press(getByText('Test Button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    const onPress = jest.fn();
    const {getByText} = render(<Button title="Test Button" onPress={onPress} disabled />);
    const buttonText = getByText('Test Button');
    // Verify onPress is not called when disabled button is pressed
    fireEvent.press(buttonText);
    expect(onPress).not.toHaveBeenCalled();
    // Verify button text is rendered (button exists but is disabled)
    expect(buttonText).toBeTruthy();
  });
});

