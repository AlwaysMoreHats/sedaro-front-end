export const getData = (
  start: number,
  stop: number,
  width: number = 0.00001157407 // 1 second in days
) => {
  return new Promise((resolve, reject) => {
    if (start < 0 || start >= stop || width <= 0) {
      reject({ error: 'Invalid range' });
    }
    setTimeout(() => {
      if (Math.random() > 0.7) {
        reject({ error: 'Unknown error' });
      }
      const data: { [key: string]: number[] } = {
        t: [],
        x: [],
        y: [],
        z: [],
      };
      for (let i = start; i <= stop; i += width) {
        const r = (i % 1) * 2 * Math.PI;
        data.t.push(i);
        data.x.push(Math.sin(r));
        data.y.push(Math.cos(r));
        data.z.push(Math.tan(r));
      }
      resolve(data);
    }, ((stop - start) / width) * 0.5 + Math.random() * 1000); // Pseudo-random, load-dependent latency
  });
};
