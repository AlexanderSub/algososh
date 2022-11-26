import {Circle} from './circle'
import renderer from 'react-test-renderer'
import { ElementStates } from '../../../types/element-states'

describe('Circle', () => {
  it('Пустой круг рендерится без ошибок', () => {
    const tree = renderer.create(
      <Circle/>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('Круг с буквой рендерится без ошибок', () => {
    const tree = renderer.create(
      <Circle letter='A'/>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('Круг с head', () => {
    const tree = renderer.create(
      <Circle head={'test'}/>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('Круг с react-элементом в head', () => {
    const tree = renderer.create(
      <Circle head={<p>test</p>}/>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('Круг с tail', () => {
    const tree = renderer.create(
      <Circle tail={'test'}/>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('Круг с react-элементом в tail', () => {
    const tree = renderer.create(
      <Circle tail={<p>test</p>}/>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('Круг с index', () => {
    const tree = renderer.create(
      <Circle index={1}/>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('Круг c пропом isSmall ===  true', () => {
    const tree = renderer.create(
      <Circle isSmall/>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('Круг в состоянии default', () => {
    const tree = renderer.create(
      <Circle state={ElementStates.Default}/>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('Круг в состоянии changing', () => {
    const tree = renderer.create(
      <Circle state={ElementStates.Changing}/>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('Круг в состоянии modified', () => {
    const tree = renderer.create(
      <Circle state={ElementStates.Modified}/>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})