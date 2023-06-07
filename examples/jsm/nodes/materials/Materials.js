import LineBasicNodeMaterial from './LineBasicNodeMaterial.js';
import MeshBasicNodeMaterial from './MeshBasicNodeMaterial.js';
import MeshStandardNodeMaterial from './MeshStandardNodeMaterial.js';
import PointsNodeMaterial from './PointsNodeMaterial.js';
import { Material } from 'three-139-optimized';

export {
	LineBasicNodeMaterial,
	MeshBasicNodeMaterial,
	MeshStandardNodeMaterial,
	PointsNodeMaterial
};

const materialLib = {
	LineBasicNodeMaterial,
	MeshBasicNodeMaterial,
	MeshStandardNodeMaterial,
	PointsNodeMaterial
};

const fromTypeFunction = Material.fromType;

Material.fromType = function ( type ) {

	if ( materialLib[ type ] !== undefined ) {

		return new materialLib[ type ]();

	}

	return fromTypeFunction.call( this, type );

};
