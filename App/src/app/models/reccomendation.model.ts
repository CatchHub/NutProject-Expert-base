export class Reccomendation {
  bmi: number;
  bodyStateGroup: string;
  acceptableBmi: string;
  recommendedCalorieIntake: number;
  recommendedProteinIntake: number;
  restrictedFoods: Array<string>;
  constructor(
    bmi: number,
    bodyStateGroup: string,
    acceptableBmi: string,
    recommendedCalorieIntake: number,
    recommendedProteinIntake: number,
    restrictedFoods: Array<string>
  ) {
    this.bmi = bmi;
    this.bodyStateGroup = bodyStateGroup;
    this.acceptableBmi = acceptableBmi;
    this.recommendedCalorieIntake = recommendedCalorieIntake;
    this.recommendedProteinIntake = recommendedProteinIntake;
    restrictedFoods.forEach((element, index) => {
      this.restrictedFoods[index] = element;
    });
  }
}
