# Things that I did not get to

## More Robust data fetching

I broke up the calls into chunks to take advangate of the asyncronous nature of the calls, but sometimes it will just lock up (probably because the browser is overloaded with the sheer number of calls). Doing these in batches would likely help, as would setting up a proper stream (generator functions might be really helpful for this)

## Animated Visualization

I used this library for the charts because it had the ability to be animated. I could not figure out how the animations worked.

## Better Visualization

Before starting on this project, I had in mind using something like Three.js to make a 3D chart that you could rotate to show the whole path, as well as a timeline control that you could play to see how it'd move. These would have balooned the cope of this project too much.

## Better Visual Styling

It's plain but functional. Technically works on smaller devices but the charts will break on the closed Galaxy Fold (like most other layouts). Would definitely want to use breakpoints to add a better mobile experience.

## Date code

I thought it was simple enough that I wouldn't need a Date library, but in hindsight I probably should have used it, even as simple as it is. I'm not quite sure I'm handling edge cases properly though.

## Automated Testing

Skipped this, as a significant amount of my time was wrangling my dev environment to work at all.

# App Usage

The user can pick a datetime (down to the ms) for start and end, with the resolution (Step size) also being customizable in both number and units (so they don't have figure out what fractional day an hour is). The Simulate button generates a new set of charts. This does not auto-refresh as the input is changed.