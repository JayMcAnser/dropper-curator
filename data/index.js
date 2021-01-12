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
    },
    {
      title: 'column 3',
      elements: [
        { id: 1, title: 'next element', type:'text' },
        { id: 'e-02', title: 'second element' },
        { id: 'e-03', title: 'third element' },
      ]
    },
    {
      title: 'column 4',
      elements: [
        { id: 'e-04', title: 'the other element', type:'text' },
        { id: 'e-06', title: 'image ', type: 'image', imageUrl: 'http://www.jaaps.nu/wp-content/uploads/2017/01/20110803-_MG_3504-e1484739016156.jpg',},
        { id: 'e-02'},
        { id: 'e-07', title: 'image ', type: 'image', imageUrl: 'http://www.jaaps.nu/wp-content/uploads/2016/11/berken-e1491126449605.jpg',},
        { id: 'e-03'},
        { id: 'e-08', type: 'image', imageUrl: 'http://www.jaaps.nu/wp-content/uploads/2016/01/20130924_124943.jpg',},

      ]
    }
  ]
}
export default data;
