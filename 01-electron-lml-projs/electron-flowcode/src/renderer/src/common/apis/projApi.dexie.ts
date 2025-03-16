import { Proj } from '@shared/@types/proj';

import { db } from '@renderer/common/dexieDB'

//addProjApi, deleteProjApi, updateProjApi

export const addProjApi = async (proj: Proj) => {
  const projUpdated: Proj = {
    ...proj,
    isSelected: 0
  }

  db.projs.add(projUpdated).then(id => {
    console.log(`Data added successfully with ID: ${id}`);
  }).catch(error => {
    console.error('Unable to add data:', error);
  });
};

export const updateProjApi = async (proj: Proj) => {
  db.projs.update(proj.id, proj).then(result => {
    if (result === 1) {
      console.log('Data updated successfully');
    } else if (result === 0) {
      console.log('No data found with ID:', proj.id);
    }
  }).catch(error => {
    console.error('Unable to update data:', error);
  });
};

export const deleteProjApi = async (projId: number) => {
  await db.projs.delete(projId)
};

// 新增的 getSelectedProjApi
export const getSelectedProjApi = async (): Promise<Proj | undefined> => {
  try {
    const selectedProj = await db.projs.where('isSelected').equals(1).first();
    return selectedProj;
  } catch (error) {
    console.error('Unable to get selected project:', error);
    return undefined;
  }
};
