import React from 'react';
import { CountdownResult } from './CountdownResultValue';

export type CountdownRandomizerProps = {

}

export type CountdownRandomizerState = {
  values: string[]
  randomizedValue: string
  shouldRandomize: boolean
  counter: number
}

export class CountdownRandomizer extends React.Component<CountdownRandomizerProps, CountdownRandomizerState> {
  private logStateInterval: NodeJS.Timeout | null = null;
  private countdownInterval: NodeJS.Timeout | null = null;
  private readonly countdownMs: number = 5000;
  constructor(props: CountdownRandomizerProps) {
    super(props);
    this.state = {
      values: [],
      randomizedValue: '',
      shouldRandomize: false,
      counter: 0
    };
  }

  componentWillUnmount() {
    if (this.logStateInterval) {
      clearInterval(this.logStateInterval)
    }
  }

  private randomizeValues = async () => {
    this.createLogStateInterval();
    this.setState({
      shouldRandomize: true,
      counter: this.countdownMs / 1000
    });
    this.createTimerToStopRandomizing();
    this.createIntervalForCountdown();
    this.randomizeValuesWorker();
  }

  private randomizeValuesWorker = async () => {
    setTimeout(async () => {
      while (this.state.shouldRandomize) {
        await this.sleep(100);
        this.setState({
          randomizedValue: this.state.values.at(Math.floor(Math.random() * this.state.values.length)) || ''
        });
      }
      if (this.countdownInterval) {
        clearInterval(this.countdownInterval);
        this.countdownInterval = null;
      }
    });
  }

  private createIntervalForCountdown() {
    if (!this.countdownInterval) {
      this.countdownInterval = setInterval(() => {
        this.setState({
          counter: this.state.counter - 1
        });
      }, 1000);
    }
  }

  private createTimerToStopRandomizing = () => {
    setTimeout(() => {
      this.setState({
        shouldRandomize: false
      });
    }, 5000);
  }

  private sleep = async (timeout: number) => {
    await new Promise((resolve) => setTimeout(() => resolve({}), timeout))
  }
  private updateValues = async (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      values: event.target.value.split(',')
    });
  }

  private createLogStateInterval = () => {
    if (!this.logStateInterval) {
      if (!this.logStateInterval) {
        this.logStateInterval = setInterval(this.logState, 500);
      }
    }
  }

  private logState = () => {
    console.log(this.state)
  }

  private resetRandomziedValue = () => {
    this.setState({
      randomizedValue: ''
    });
  }

  render() {
    return (
      <div className='countdown-randomizer-container'>
        <input type='text' disabled={this.state.shouldRandomize} onChange={(e) => this.updateValues(e)} placeholder='Add values and separate them by ,' />
        <div className='buttons-wrapper'><button disabled={this.state.shouldRandomize} onClick={() => this.randomizeValues()}>Randomize values</button><button disabled={this.state.shouldRandomize} onClick={() => this.resetRandomziedValue()}>Reset Randomized Value</button></div>
        <CountdownResult randomizedValue={this.state.randomizedValue} counter={this.state.counter} />
      </div>
    );
  }
}