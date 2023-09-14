export const PARTS_COUNT = 8;
export const MATERIALCOUNT_PER_HORSETYPE = 4;
export const INVENTORY_COUNT = 16;
export const parts={
  'head':0,
  'neck':1,
  'frame':2,
  'mane':3,
  'body':4,
  'leg':5,
  'ear':6,
  'tail':7,  
  'wing':8,  
};

export const partsNames = [  
  'head',
  'neck',
  'frame',
  'mane',
  'body',
  'leg',
  'ear',    
  'tail',  
  'wing',  
];

export const ItemTable={
  'body':[0,1,2,3,4,5,6,7,8,9,10,11],
  'leg':[0,1,2,3,4,5,6,7,8,9,10,11],
  'ear':[0,1,2,3,4,5,6,7,8,9,10,11],
  'head':[0,1,2,3,4,5,6,7,8,9,10,11],
  'frame':[0,1,2,3,4,5,6,7,8,9,10,11],
  'tail':[0,1,2,3,4,5,6,7,8,9,10,11],
  'neck':[0,1,2,3,4,5,6,7,8,9,10,11],
  'mane':[0,1,2,3,4,5,6,7,8,9,10,11],
  'wing':[0,1,2,3,4,5,6,7,8,9,10,11],
};

export const ItemRareType={
  'body':[0,0,0,0,1,1,1,1,2,2,2,2],
  'leg':[0,0,0,0,1,1,1,1,2,2,2,2],
  'ear':[0,0,0,0,1,1,1,1,2,2,2,2],
  'head':[0,0,0,0,1,1,1,1,2,2,2,2],
  'frame':[0,0,0,0,1,1,1,1,2,2,2,2],
  'tail':[0,0,0,0,1,1,1,1,2,2,2,2],
  'neck':[0,0,0,0,1,1,1,1,2,2,2,2],
  'mane':[0,0,0,0,1,1,1,1,2,2,2,2],
  'wing':[0,0,0,0,1,1,1,1,2,2,2,2],
};

export const ItemRareTypeStr=[
  'common',
  'epic',
  'rare',
  'legend',
];

export function GetContainPartsName(name)
{
  for(var i = 0; i < partsNames.length; ++i)
  {
    var partsName = partsNames[i];

    if(name.includes(partsName))
      return partsName;
  }  
}

export function GetContainPartsIndex(name)
{
  for(var i = 0; i < partsNames.length; ++i)
  {
    var partsName = partsNames[i];

    if(name.includes(partsName))
    {
      return parts[partsName];
    }
  }  
}

export function InventoryIndexToShape(inventoryindex)
{  
  return parseInt(inventoryindex/MATERIALCOUNT_PER_HORSETYPE)+1;
}

export function InventoryIndexToMaterial(inventoryindex)
{  
  return parseInt(inventoryindex%MATERIALCOUNT_PER_HORSETYPE)+1
}

export function ChangeGloss(horseShape, sethorseShape, roughness)
{
  const horseShapeTemp = {...horseShape};
  horseShapeTemp.roughness = roughness;
  sethorseShape(horseShapeTemp);                
}

export function ChangeColor(horseShape, sethorseShape, color)
{
  const horseShapeTemp = {...horseShape};
  horseShapeTemp.color = color;
  sethorseShape(horseShapeTemp);
}

export default partsNames;