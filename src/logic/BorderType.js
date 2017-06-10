import {Enum} from 'enumify';

class BorderType extends Enum {}
BorderType.initEnum(['OUTER', 'INNER_BOX', 'NORMAL']);
export default BorderType;
