export type IEstradiolLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export const ESTRADIOL_LEVEL: Record<IEstradiolLevel, IEstradiolLevel> = {
  HIGH: 'HIGH',
  MEDIUM: 'MEDIUM',
  LOW: 'LOW',
}

export type IConsumption = 'PILLS' | 'INJECTIONS';

export const CONSUMPTION: Record<IConsumption, IConsumption> = {
  PILLS: 'PILLS',
  INJECTIONS: 'INJECTIONS',
}

export type ICourseLevel = 'BEGINNER' | 'ADVANCED';

export const COURSE_LEVEL: Record<ICourseLevel, ICourseLevel> = {
  BEGINNER: 'BEGINNER',
  ADVANCED: 'ADVANCED',
}

export type ICourseGoal = 'MUSCLES_GAINING' | 'BODY_SHAPING';

export const COURSE_GOAL: Record<ICourseGoal, ICourseGoal> = {
  MUSCLES_GAINING: 'MUSCLES_GAINING',
  BODY_SHAPING: 'BODY_SHAPING',
}

export type IReferenceValuesRangeUnit = 'PG_PER_ML';

export const REFERENCE_VALUES_RANGE_UNIT: Record<IReferenceValuesRangeUnit, string> = {
  PG_PER_ML: 'пг/мл',
}

export type IAntagonistDrugType = 'AROMATASE_INHIBITOR' | 'PROLACTIN_INHIBITOR' | 'GONADOTROPIN' | 'ANTIESTROGEN' | 'BP_PRESSURE' | 'LIVER';

export const ANTAGONIST_DRUG_TYPE: Record<IAntagonistDrugType, IAntagonistDrugType> = {
  AROMATASE_INHIBITOR: 'AROMATASE_INHIBITOR',
  PROLACTIN_INHIBITOR: 'PROLACTIN_INHIBITOR',
  GONADOTROPIN: 'GONADOTROPIN',
  ANTIESTROGEN: 'ANTIESTROGEN',
  BP_PRESSURE: 'BP_PRESSURE',
  LIVER: 'LIVER',
}

export const MODAL = {
  LOGIN: 'modal-login',
  QUIZ: 'modal-quiz',
}
