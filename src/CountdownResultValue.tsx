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
        return this.props.counter > 0 ? `Revealing answer in ${this.props.counter}` : ``;
    }

    private renderRandomizedValueMessage() {
        return this.props.randomizedValue.length ?
        <div className='randomized-value'>Randomized value: {this.props.randomizedValue}</div>
        :
        <div className='randomized-value-initial-message'>Please add values to the input field and click randomize values</div>
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