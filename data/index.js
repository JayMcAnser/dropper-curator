/**
 * fake data
 */

const data = async function () {
  return [
    {
      title: 'column 1',
      elements: [
        { id: 1, title: 'first element', type:'text' },
        { id: 'e-02', title: 'second element' },
        { id: 'e-03', title: 'third element' },
      ]
    },
    {
      title: 'column 2',
      elements: [
        { id: 'e-04', title: 'the other element', type:'text' },
        { id: 'e-05', title: 'image ', type: 'image', imageUrl: 'http://www.jaaps.nu/wp-content/uploads/2016/08/DSC5213-e1472502299332.jpg',},
        { id: 'e-02'},
        { id: 'e-03'},
      ]
    }
  ]
}
export default data;
