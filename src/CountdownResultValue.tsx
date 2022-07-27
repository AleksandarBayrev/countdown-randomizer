import React from 'react';

export type CountdownResultProps = {
    counter: number;
    randomizedValue: string;
}

export class CountdownResult extends React.Component<CountdownResultProps> {
    constructor(props: CountdownResultProps) {
        super(props);
    }

    private renderCounterText() {
        return this.validateInput && this.props.counter > 0 ? `Revealing answer in ${this.props.counter}` : ``;
    }

    private renderRandomizedValueMessage() {
        return this.validateInput ?
        <div className='randomized-value'>Randomized value: {this.props.randomizedValue}</div>
        :
        <div className='randomized-value-initial-message'>Please add at least two values to the input field and click randomize values</div>
    }

    private get validateInput() {
        return this.props.randomizedValue.length > 0;
    }
    render(): React.ReactNode {
        return (
            <div className='randomized-value-container'>
                <div className='randomized-value-counter'>{this.renderCounterText()}</div>
                {this.renderRandomizedValueMessage()}
            </div>
        )
    }
}