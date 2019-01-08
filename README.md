# Spawn function
Async/await is essentially syntatic sugar around a generator function which relies on promises. 

The generator function is passed to a spawn function. This spawn function will return a promise which is resolved with the final 
return value of the generator once the generator returns done is equal to true. Recursively call **then** on the generators' returned promises, 
passing in the result to the next call of **next** on the generator.

# Video on async/await
https://www.youtube.com/watch?v=lil4YCCXRYc

The videos (better) implementation is shown at https://youtu.be/lil4YCCXRYc?t=1132
or also here: https://youtu.be/DqMFX91ToLw?t=1693
