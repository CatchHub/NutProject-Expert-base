import sys
import json
""" Input values  provided from user"""
Height = int()
Weight = int()
Age = int()
Gender = str()
ActivityLevel = str()

"""" Group objects determined from the users information """
Genders = {'F': 'Female', 'M': 'Male'}

ActivityLevels = {'L': 'Low', 'M': 'Medium', 'H': 'High', 'E': 'Extreme'}

AgeGroups = {'Between 19-24': 'Group1',
            'Between 25-34': 'Group2',
            'Between 35-44': 'Group3',
            'Between 45-54': 'Group4',
            'Between 55-64': 'Group5',
            '65+': 'Group6'}

Diseases = ['Heart Disease',
            'Colestherol',
            'Kidney Disease',
            'Liver Disease',
            'Diarrhea',
            'Gall Bladder Disease',
            'Diabetes']

BodyStateGroups = {'BMI 18.5-': 'Thin',
                  'BMI between 18.5-19.9': 'Almost Normal',
                  'BMI between 20.0-24.9': 'Normal',
                  'BMI between 25.0-29.9': 'Slightly Fat',
                  'BMI between 30.0-34.9': 'Stage 1 Obese',
                  'BMI between 35.0-39.9': 'Stage 2 Obese',
                  'BMI  40+': 'Morbid Obese'}

AcceptableBMI_Age = {'Group1' : 'BMI: 19-24',
                    'Group2' : 'BMI: 20-25',
                    'Group3' : 'BMI: 21-26',
                    'Group4' : 'BMI: 22-27',
                    'Group5' : 'BMI: 23-28',
                    'Group6' : 'BMI: 24-29'}

RestrictedFoods = list()
 
def calculateBMI(weight, height):
    metricHeight = int(height/100) + (height % 100)* 0.01 
    BMI = weight / (metricHeight * metricHeight)
    return round(BMI,2)

def calculateBasalMetobolismSpeed(weight, height, age, gender):
    print("BASAL MET SPED",weight, height, age, gender)
    Basal = float()
    if(gender == 'Female'):
        Basal = (10 * weight) + (6.25 * height) - (5 * age) - 161
    elif(gender == 'Male'):
        Basal = (10 * weight) + (6.25 * height) - (5 * age) + 5
    print("BASAL MET SPED",Basal)
    return Basal

def calculateDailyCalorieNeeded(basalMetobolismSpeed, activityLevel):
    print(basalMetobolismSpeed, activityLevel)
    if(activityLevel == 'Low'):
        return basalMetobolismSpeed * 1.2
    elif(activityLevel == 'Medium'):
        return basalMetobolismSpeed * 1.55
    elif(activityLevel == 'High'):
        return basalMetobolismSpeed * 1.725
    elif(activityLevel == 'Extreme'):
        return basalMetobolismSpeed * 1.9

def RecommendedProteinIntake(weight, bmi, activityLevel):
    if(bmi>= 30.0):
        return "Your recommended daily protein intake can not be calculated, you should get an advice from nutritions"
    if(activityLevel == 'Low'):
        return weight * 0.8
    elif(activityLevel == 'Medium'):
        return weight * 1.0
    elif(activityLevel == 'High'):
        return weight * 1.2
    elif(activityLevel == 'Extreme'):
        return weight * 1.5

def findAgeGroup(age):
    if(19<=age<=24):
        return AgeGroups['Between 19-24']
    elif(25<=age<=34):
        return AgeGroups['Between 25-34']
    elif(35<=age<=44):
        return AgeGroups['Between 35-44']
    elif(45<=age<=54):
        return AgeGroups['Between 45-54']
    elif(55<=age<=64):
        return AgeGroups['Between 55-64']
    elif(65<=age):
        return AgeGroups['65+']

def findBodyStateGroup(bmi):
    if(bmi<=18.5):
        return BodyStateGroups['BMI 18.5-']
    elif(18.5<=bmi<=19.9):
        return BodyStateGroups['BMI between 18.5-19.9']
    elif(20.0<=bmi<=24.9):
        return BodyStateGroups['BMI between 20.0-24.9']
    elif(25.0<=bmi<=29.9):
        return BodyStateGroups['BMI between 25.0-29.9']
    elif(30.0<=bmi<=34.9):
        return BodyStateGroups['BMI between 30.0-34.9']
    elif(35.0<=bmi<=39.9):
        return BodyStateGroups['BMI between 35.0-39.9']
    elif(40.0<=bmi):
        return BodyStateGroups['BMI  40+']

def findIfBmiAcceptable(bmi, ageGroup):
    lowerLimit = 19.0
    upperLimit = 24.0
    if(ageGroup == AgeGroups['Between 19-24']):
        if(lowerLimit<=bmi<=upperLimit):
            return True
    elif(ageGroup == AgeGroups['Between 25-34']):
        if(lowerLimit+1<=bmi<=upperLimit+1):
            return True
    elif(ageGroup == AgeGroups['Between 35-44']):
        if(lowerLimit+2<=bmi<=upperLimit+2):
            return True
    elif(ageGroup == AgeGroups['Between 45-54']):
        if(lowerLimit+3<=bmi<=upperLimit+3):
            return True
    elif(ageGroup == AgeGroups['Between 55-64']):
        if(lowerLimit+4<=bmi<=upperLimit+4):
            return True
    elif(ageGroup == AgeGroups['65+']):
        if(lowerLimit+5<=bmi<=upperLimit+5):
            return True
    return False

def RecommendedCalorieIntake(bmiIsAcceptable, bodyStateGroup, dailyCalorieNeed):
    print("RECCOMENDED CALORie",bmiIsAcceptable, bodyStateGroup, dailyCalorieNeed)
    if(bmiIsAcceptable):
        return dailyCalorieNeed
    elif(bodyStateGroup == BodyStateGroups['BMI 18.5-']):
        return dailyCalorieNeed + 500.0
    elif(bodyStateGroup == BodyStateGroups['BMI between 18.5-19.9']):
        return dailyCalorieNeed + 200.0
    elif(bodyStateGroup == BodyStateGroups['BMI between 25.0-29.9']):
        return dailyCalorieNeed - 200.0
    elif(bodyStateGroup == BodyStateGroups['BMI between 30.0-34.9']):
        return dailyCalorieNeed + 500.0
    elif(bodyStateGroup == BodyStateGroups['BMI between 35.0-39.9']):
        return dailyCalorieNeed + 1000.0


def RestrictedFoodsRuleChain(disease):
    if(disease == Diseases[0] or disease == Diseases[1]):
        RestrictedFoods.append("B??rek, kek, ya?? pasta, ????rek, kurabiye, mayonez, tahin, pasta soslar??, kaymak, krema gibi ya??l?? besinleri t??ketmeyiniz.")
        RestrictedFoods.append("Alkoll?? i??ecekler, lik??r, haz??r meyve sular??, kola")
        RestrictedFoods.append("????lenmi?? et ??r??nleri, sucuk, sosis, salam, jambon, past??rma.")
        RestrictedFoods.append("Et suyu, tavuk suyu ve bunlarla pi??irilmi?? yemekler.")
        RestrictedFoods.append("Sigara kullanmay??n??z.")
        RestrictedFoods.append("??eker t??ketimine dikkat ediniz.")
        RestrictedFoods.append("Tur??u gibi salamura besinler t??ketmeyiniz.")
        RestrictedFoods.append("G??nde bir fincandan fazla kahve ve t??revi t??ketmeyiniz.")

    if(disease == Diseases[2]):
        RestrictedFoods.append("G??n i??erisinde 2 porsiyondan fazla meyve t??ketmeyiniz.")
        RestrictedFoods.append("????eri??i bilinmeyen ??rek, kek ve pasta t??ketmeyiniz.")
        RestrictedFoods.append("Tur??u, konserve, salamuralar, sucuk, past??rma, salam gibi yiyecekleri t??ketmeyiniz.")
        RestrictedFoods.append("Haz??r ??orbalar, ??ikolata, haz??r meyve sular??, asitli i??ecekler, boza, kahve ve kakao t??ketiminden ka????n??n??z.")
        RestrictedFoods.append("Yemeklerin suyunu t??ketmeyiniz.")
        RestrictedFoods.append("Sakatat t??ketmeyiniz.")
    
    if(disease == Diseases[3]):
        RestrictedFoods.append("Alkoll?? i??ecekler, lik??r, haz??r meyve sular?? ve kolal?? i??ecekler t??ketmeyiniz.")
        RestrictedFoods.append("B??rek, pasta, kek, kaymak, krema, ??ikolata, tahin, tahin helvalar?? ve hamur i??lerini t??ketmemeye ??zen g??steriniz.")
        RestrictedFoods.append("Ya??da k??zarm???? ve kavrulmu?? etlerden, tavu??un ve bal??????n derisinden, et ve tavuk suyu ile pi??irilen yemeklerden, sakatat, sucuk, past??rma, salam, sosis ve salamuralardan uzak durunuz.")
        RestrictedFoods.append("Kat?? ya?? kullanmay??n??z.")
        RestrictedFoods.append("Haz??r ??orbalar ve i??eri??i bilinmeyen haz??r g??dalardan uzak durunuz.")
        RestrictedFoods.append("Kaymakl?? s??t ve yo??urt t??ketmeyiniz.")
        RestrictedFoods.append("G??nde 4 ka????ktan fazla ??eker t??ketmeyiniz.")

    if(disease == Diseases[4]):
        RestrictedFoods.append("Kuru baklagiller ve kepekli tah??llardan uzak durunuz.")
        RestrictedFoods.append("??i?? sebze ve meyve t??ketmeyiniz")
        RestrictedFoods.append("Esmer ekmek t??ketmeyiniz.")
        RestrictedFoods.append("Yo??urt ve ya??l?? ayran t??ketmeyiniz.")
        RestrictedFoods.append("Ya??l?? g??dalardan uzak durunuz.")
        RestrictedFoods.append("??eker ve ??ekerli besinlerden uzak durunuz.")
        RestrictedFoods.append("Haz??r meyve sular??, asitli i??ecekler, kahve ve kakao t??ketmeyiniz.")

    if(disease == Diseases[5]):
        RestrictedFoods.append("Koyu ??ay, kahve, boza, haz??r meyve sular??, kola ve alkolden uzak durunuz.")
        RestrictedFoods.append("Yumurta ve yumurtal?? g??dalardan ka????n??n??z.")
        RestrictedFoods.append("Ya??da k??zarm???? ve kavrulmu?? etlerden, tavu??un ve bal??????n derisinden, et ve tavuk suyu ile pi??irilen yemeklerden, sakatat, sucuk, past??rma, salam, sosis ve salamuralardan uzak durunuz.")
        RestrictedFoods.append("Kaymak, krema, ??ikolata, tahin ve tahin helvas?? t??ketmeyiniz.")
        RestrictedFoods.append("F??nd??k, f??st??k gibi ya??l?? yemi??lerden uzak durunuz.")
        RestrictedFoods.append("Sal??al?? ve a????r?? baharatl?? g??dalardan uzak durunuz.")

    if(disease == Diseases[6]):
        RestrictedFoods.append("Kan ??ekerini h??zla y??kselten ??eker ve ??ekerli g??dalardan ka????n??n??z.")
        RestrictedFoods.append("Bal, re??el, pekmez, marmelat t??ketmeyiniz.")
        RestrictedFoods.append("Alkoll?? i??ecekler, haz??r meyve sular?? ve kolal?? i??eceklerden t??ketmeyiniz.")
        RestrictedFoods.append("Sigara t??ketmeyiniz.")
        RestrictedFoods.append("Kuru meyve t??ketmeyiniz.")

def informUser(bmi, ageGroup, bodyStateGroup, recommendedCalorieIntake, recommendedProteinIntake):
    Object = {  
        "bmi": bmi,
        "bodyStateGroup": bodyStateGroup,
        "acceptableBmi": AcceptableBMI_Age[ageGroup],
        "recommendedCalorieIntake": recommendedCalorieIntake,
        "recommendedProteinIntake": recommendedProteinIntake,
        "restrictedFoods": RestrictedFoods
    }
    returnObject = json.dumps(Object)
    with open ("userRecommendations.json", "w") as outfile:
        outfile.write(returnObject)
    print(returnObject)
    # print("Your BMI score is:%.2f" %bmi)
    # print("Your acceptable BMI ratings by your age is:", AcceptableBMI_Age[ageGroup])
    # print("Your body state due to your BMI score is:", bodyStateGroup)
    # print("For being or staying healty body state your daily calorie intake should be approximately:", recommendedCalorieIntake)
    # print("For being or staying healty metobolism your daily protein(do not apply this if you have a kidney or any kind of protein digestion problem!) intake should be approximately:", recommendedProteinIntake, 'gr')
    # print("-------------------------------------------------------------------------------------------------------")
    # print("Restricted foods and some eating habit should does due to your illness:")
    # for advice in RestrictedFoods:
    #     print(advice)

def main():

    Height = int(sys.argv[1])
    Weight = int(sys.argv[2])
    Age = int(sys.argv[3])
    Gender = str(sys.argv[4])
    ActivityLevel = sys.argv[5]
    d = sys.argv[6].split(",")
    for i in range(len(Diseases)):
        approval = d[i]
        
        if(approval == "true"):
            RestrictedFoodsRuleChain(Diseases[i])
    AgeGroup = findAgeGroup(Age)
    bmi = calculateBMI(Weight, Height)
    basalMetobolismSpeed = calculateBasalMetobolismSpeed(Weight, Height, Age, Gender)
    dailyCalorieNeeded = calculateDailyCalorieNeeded(basalMetobolismSpeed, ActivityLevel)
    bodyStateGroup = findBodyStateGroup(bmi)
    bmiIsAcceptable = findIfBmiAcceptable(bmi, AgeGroup)
    recommendedCalorieIntake = RecommendedCalorieIntake(bmiIsAcceptable, bodyStateGroup, dailyCalorieNeeded)
    recommendedProteinIntake = RecommendedProteinIntake(Weight, bmi, ActivityLevel)
    informUser(bmi, AgeGroup, bodyStateGroup, recommendedCalorieIntake, recommendedProteinIntake)

if (__name__ == "__main__"):
    main()