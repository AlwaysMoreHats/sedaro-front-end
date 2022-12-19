## Goal

The goal of this exercise is to gain a better understanding of your ability to think through and solve relevant challenges related to Front-End engineering at Sedaro. This is an opportunity for you to show off your personal strengths, so we're interested in seeing more than just a working solution. Get creative, the problem is intentionally open-ended.

Within the next `7` days, attempt the following mini-project and return your solution as a `.zip` archive containing the full project and any notes on how to setup and run your specific solution. As important as your solution, we are interested in understanding your thought process and your ability to clearly communicate your approach so a writeup may also be included.

Please note that if you end up getting to a solution that you aren't happy with or that is a dead end, document why and we will call that good enough. Please don't invest too much time. A writeup of why a solution is insufficient and how you might approach it differently often tells us what we need to know. And as always, don't be afraid to really show off your skills and creativity.

If you have any questions or issues while you work through this problem or if you get stuck, please contact Bas Welsh at sebastian.welsh@sedarotech.com.

## Setup

1. Clone this repository.
   - Please note that **only** cloning via HTTPS is supported
   - Please **do not** commit changes to any branch of this repository. If you would like to use git, you may fork this repository to create a private repo of your own
1. `cd` into the `sedaro` directory, and run `yarn install` and `yarn start` to start the application
1. Open [http://localhost:3000](http://localhost:3000) to view it in the browser
   - The page will reload if you make edits
   - You will also see any lint errors in the command line

## Problem Statement

Your job is to develop a streaming data analytics view that displays live time series data in an animated playback. The component should contain a styled form that takes the following as user input:

- Start Date/Time: The start datetime of the time series data to display
- Resolution: The resolution of the time series data to display (ex. 1 minute, 1 hour, 1 day)
- A "Simulate" button to start the simulation

On form submit, the component should make incremental requests to the mock data source to fetch the live simulation data in chunks. This data should then be displayed in one or more plots, and the plotted data should scroll from right to left in an animated fashion, appending new data to the end as it is fetch. As a bonus, try to smooth the addition of new data beyond simply appending large chunks as they are fetched.

The data source is mocked via the `getData` function in `src/data.ts`. Below is the interface to the async function:

```typescript
import { getData } from './data';

// Units: decimal days
const start = 12.01;
const stop = start + 0.01;
const resolution = 0.00001157407; // 1 second

getData(start, stop, resolution); // Returns a Promise
```

Data from the mock data source is structured as a Stream, where a Stream is defined as a set of uniquely identifiable data with shared time vector `t`.

```typescript
// Example Stream
{
  // Time vector
  t: [12.01, 12.01001157407, 12.01002314815, ...], // Units: Decimal days from an arbitrary epoch
  // Data vectors
  x: [1, 2, 3, ...],
  y: [4, 5, 6, ...],
  z: [7, 8, 9, ...],
}
```

**Note:** The data source will occasionally return an error. You should handle this error gracefully and continue to fetch data, repeating the failed request until it succeeds.

### Additional Requirements

1. Please use React functional components and hooks to build out your solution
1. Please use TypeScript
1. You may use whatever OSS libraries you would like in your implementation as long as they are available through NPM
