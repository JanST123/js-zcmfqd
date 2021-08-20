const Range = require('cidr');

range = new Range('192.168.1.0/24');
console.log(range);

const netmask = 22;
// create bit string (we need 32 bits, add `netmask` 1-bits, fill up with zero bits )
const bitString = Array(32).fill('1', 0, netmask).fill('0', netmask);
const bitSegments = [
  bitString.slice(0, 8),
  bitString.slice(8, 16),
  bitString.slice(16, 24),
  bitString.slice(24, 32)
];
const netmaskSegments = bitSegments.map(bits => parseInt(bits.join(''), 2));

console.log(netmaskSegments);

const possibleIps = [];
const network = '192.168.4.0';

const networkSegments = network.split('.');
let hostMin = [];
let hostMax = [];

networkSegments.forEach((networkSegment, index) => {
  if (netmaskSegments[index] === 255) {
    hostMin.push(networkSegment);
    hostMax.push(networkSegment);
  } else {
    const freeNumbers = index === 3 ? 254 : 255;
    hostMin.push(index === 3 
      ? Math.max(1, Math.min(networkSegment, freeNumbers - netmaskSegments[index]))
      : Math.min(networkSegment, freeNumbers - netmaskSegments[index]));
    hostMax.push(freeNumbers - netmaskSegments[index]);
  }
});

console.log(hostMin.join('.'), hostMax.join('.'));

/*for (let i = 1; i < 255; ++i) {
  possibleIps.push(segments.join('.') + '.' + i);
}*/

//console.log(possibleIps);

