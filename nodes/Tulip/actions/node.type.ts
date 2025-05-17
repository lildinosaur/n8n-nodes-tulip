import type { AllEntities, Entity } from 'n8n-workflow';

type TulipMap = {
	table:
		| 'createTable'
		| 'listTables'
		| 'lookupTable'
		| 'updateTable'
		| 'lookupRecord'
		| 'createRecord'
		| 'updateRecord'
		| 'countRecords'
		| 'listRecords'
		| 'deleteRecord'
		| 'deleteRecords'
		| 'incrementDecrementRecord';
	machine: 'listMachines' | 'setMachineAttribute';
};

export type Tulip = AllEntities<TulipMap>;

export type TulipTable = Entity<TulipMap, 'table'>;
export type TulipMachine = Entity<TulipMap, 'machine'>;
