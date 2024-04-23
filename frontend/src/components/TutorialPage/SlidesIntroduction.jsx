import {styles} from "@/assets/style.js"
import ShowCodeAlert from "@/components/TutorialPage/ShowCodeAlert.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useEffect, useState} from "react";
import correlationImg from "@/assets/img/correlation_features_meaning.png"
import RepartitionGraph from "@/components/RepartitionChart/RepartitionGraph.jsx";
import useStore from "@/store/store.js";
import BarChartConsumptionType from "@/components/BarChart/BarChartConsumptionType.jsx";
const codeCorrelation =
    <div>
    <p>
        correlations = []
        for drug in drugs:
        for feature in features:
        correlations.append((drug, feature, df[drug].corr(df[feature])))
    </p>
    <p>
        correlations = sorted(correlations, key=lambda x: x[2], reverse=True)
    </p>
    <p>
        print(*correlations[:30], sep='\n')
    </p>
    <ul className="list-disc pl-5">
        <li>('Cannabis', 'SS', 0.45613655450406493)</li>
        <li>('Cannabis', 'Oscore', 0.41416262189358455)</li>
        <li>('Legalh', 'SS', 0.4055778552531838)</li>
        <li>('Ecstasy', 'SS', 0.38818619655992304)</li>
        <li>('Mushrooms', 'SS', 0.3782853777625287)</li>
        <li>('LSD', 'Oscore', 0.36975911051910304)</li>
        <li>('Mushrooms', 'Oscore', 0.36913941481128937)</li>
        <li>('LSD', 'SS', 0.36553577743377336)</li>
        <li>('Coke', 'SS', 0.3433520664032049)</li>
        <li>('Amphet', 'SS', 0.33110522351156163)</li>
        <li>('Legalh', 'Oscore', 0.31732226610206776)</li>
        <li>('Cannabis', 'Impulsive', 0.3105287456498304)</li>
        <li>('Nicotine', 'SS', 0.3056345911961203)</li>
        <li>('Ecstasy', 'Oscore', 0.2963057088389688)</li>
        <li>('Amphet', 'Impulsive', 0.2894381837447692)</li>
        <li>('Benzos', 'Nscore', 0.27222065600294526)</li>
        <li>('Legalh', 'Impulsive', 0.2675787698375155)</li>
        <li>('Mushrooms', 'Impulsive', 0.26368389461899877)</li>
        <li>('Ecstasy', 'Impulsive', 0.2608640467105362)</li>
        <li>('Coke', 'Impulsive', 0.2600421406491375)</li>
    </ul>
</div>
const codePython=
    <div className={`flex flex-col`}>
        <p>from itertools import groupby</p>
        <p>from statistics import mean</p>
        <p>correlations.sort(key=lambda x: x[1])</p>
        <p>grouped_data = {}</p>
        <p># We group data by the second element of the tuple (feature)</p>
        <p>for key, group in groupby(correlations, key=lambda x: x[1]):</p>
        <p>data = list(group)</p>
        <p>grouped_data[key] = &#123;</p>
        <p>"mean": mean([x[2] for x in data]),</p>
        <p>"correlations": data</p>
        <p>&#125;</p>
        <p># Then we sort the entries depending on the mean of each group</p>
        <p>sorted_grouped_data = sorted(grouped_data.items(), key=lambda x: x[1]['mean'], reverse=True)</p>
        <p>final_data = &#123;feature: data['mean'] for feature, data in sorted_grouped_data&#125;</p>
        <p>for key, value in final_data.items():</p>
        <p>print(key, "-->", value)</p>
        <p>After computing the mean correlation of all drugs for each feature, the output is the following:</p>
        <ul>
            <li>SS --> 0.24750768760730996</li>
            <li>Impulsive --> 0.1835408142616583</li>
            <li>Oscore --> 0.18211357240362108</li>
            <li>Nscore --> 0.09115772430291505</li>
            <li>Ethnicity --> 0.07279538563388822</li>
            <li>Escore --> -0.005960554225981149</li>
            <li>Ascore --> -0.10339419036206977</li>
            <li>Education --> -0.11093035147121946</li>
            <li>Cscore --> -0.1526333011851522</li>
            <li>Gender --> -0.15812904754418552</li>
            <li>Age --> -0.1923893011427491</li>
            <li>Country --> -0.25053952952862485</li>
        </ul>
    </div>
export const SlideIntroduction = () => {
    return (
        <div className={styles.textMainStyle}>
            <p className={styles.mainTitle}>
                What factors influence the most drug consumption of an individual ? A case study
            </p>
            <p>
                We have a database of 1885 respondents. For each, 12 attributes and their score is known. These
                attributes, which we'll call <b>features</b>, are based on the NEO-FFI-R personality test. This test
                measures
                the following 5 personality traits:
            </p>
            <div className = {`flex px-7 gap-x-10`}>
                <ul className={styles.listDisc}>
                    <li>Neuroticism</li>
                    <li>Extraversion</li>
                    <li>Openness to Experience</li>
                    <li>Agreeableness</li>
                    <li>Conscientiousness</li>
                </ul>
            </div>
            <p>
                We also have access to the Impulsiveness and the Sensation Seeking scores of each respondent.
            </p>

            <p>
                Each personality trait has a decimal value as a score. The higher the score, the more the respondent has
                the
                corresponding personality trait. For example, a score of 0.8 for the Neuroticism trait means that the
                respondent is very neurotic.
            </p>
            <p>
                additionally to these 7 personality attributes, we also have access to level of education, age, gender,
                country of residence and ethnicity of each respondent.
            </p>

            <p>
                Note that in certain countries, ethnicity statistics are illegal.
            </p>
            <p>
                In addition, participants were questioned about their use of 18 legal and illegal drugs: alcohol,
                amphetamines, amyl nitrite, benzodiazepine, cannabis, chocolate, cocaine, caffeine, crack, ecstasy,
                heroin,
                ketamine, legal highs, LSD, methadone, mushrooms, nicotine and volatile substance abuse and one
                fictitious
                drug (Semeron) which was introduced to identify over-claimers.
            </p>
            <p>
                For each drug they had to select one of the answers: never used the drug, used it over a decade ago, or
                in
                the last decade, year, month, week, or day.
            </p>
            <p className={styles.secondTitle}>
                Things to keep in mind during this analysis:
            </p>
            <ul className={styles.listDisc}>
                <li>
                    The database contains ONLY 1885 respondents. This is a very small sample size compared to the world
                    population. Therefore, the results of this analysis are <b>not</b> generalizable to the entire
                    population.
                    We only give some observations and suppositions about the data and the results. We do not make any
                    definitive statements.
                </li>
                <li>
                    Some features are not well balanced. For example most of the respondents are from the UK. This can
                    lead to
                    biased results.
                </li>
                <li>
                    Correlation does not imply causation. We can only say that two variables are correlated, not that
                    one causes
                    the other.
                </li>
            </ul>
        </div>
    );
};
export const SlideHowToReadChart = () => {
    const {apiRepartitionData, getFunctionToCall, setChartType} = useStore();
    useEffect(() => {
        setChartType('repartition')
    }, []);
    return (
        <div className={styles.textMainStyle}>
            <p className={styles.mainTitle}>
                Where to start this analysis ?
            </p>
            <p>
                First, we need to observe the repartition of each population inside the dataset.
            </p>
            <p>
                Why ? because we need to know if the dataset is balanced or not. If a given feature is not balanced, we
                need
                to take this into account when analyzing the data.
            </p>
            <div className = {`flex flex-col px-5 w-full items-center`}>
                <div className={`w-full box-content mb-2 text-black h-[30vh] bg-neutral-50 rounded-md`}>
                    <RepartitionGraph apiData={apiRepartitionData}/>
                </div>
                <div
                    className={`flex flex-col w-fit p-2 rounded-md text-black bg-neutral-50 items-center space-y-3`}>
                    <BarChartConsumptionType/>
                    <Button variant="default_blue" onClick={() => getFunctionToCall()()}>Submit</Button>
                </div>
            </div>

            <p>
                For example, we can see that there are 943 male respondents and 942 women. This feature is well
                balanced,
                thus the results we will get from the analysis might be more reliable. However, the survey was made in
                the
                UK, and the majority (1044) of the respondents are from the UK. This must be taken into account when
                observing results about different countries.
            </p>
            <p className={styles.secondTitle}>
                We found it interesting to start by analyzing the drug consumption of the respondents depending on
                non-personality related features.
            </p>
            <p>
                It may help us to understand how drug consumption frequency is distributed among the each feature. For
                example, we could ask ourselves:
            </p>
            <ul className={styles.listDisc}>
                <li>Which age range consumes the most drugs Coke ?</li>
                <li>Which gender consumes the most Alcohol ?</li>
            </ul>
            <p>
                Before making this analysis we had some preconditioned ideas. For example, we thought that the less
                educated
                a person is, the more drugs he/she consumes. We will see if these ideas are confirmed by the data.
            </p>

            <p>
                As we can see, the meth consumption of people who left school at 16 years and those with a professional
                certificate / diploma are almost the same.
            </p>

            <p>
                When you're done checking drug consumption for each non-personality related feature, you can move on to
                the
                next step.
            </p>
        </div>
    );
};
export const SlideSummary = () => {
    return (
        <div className={styles.textMainStyle}>
            <p>
                We saw in the previous step that the correlation between drug consumption and non-personality related
                features may not be as strong as we thought. Let's now analyze the correlation between drug consumption
                and personality traits. For that, we'll use a correlation matrix.
            </p>

            <p>
                This matrix shows the correlation score of each personality trait with each drug. The higher the score,
                the more the personality trait is correlated with the drug consumption.
            </p>

            <p>
                For example, the correlation between the respondents who have a high openness score and the consumption
                of LSD is 0.37, which is quite high. The higher the correlation, the darker the color.
            </p>

            <p>
                This helps understand which personality trait is correlated or not to the use of a specific drug.
            </p>
        </div>
    );
};

export const SlideCorrelationIntroduction = () => {
    return (
        <div className={styles.textMainStyle}>
            <p className={styles.secondTitle}>
                As you can expect, the goal of this whole analysis is to predict which characteristics of a person make
                him/her more likely to consume drugs with a high frequency. This can be useful for drug prevention
                programs, for example.
            </p>
            <p>
                It would help answer questions like:
            </p>

            <ul className={styles.listDisc}>
                <li>Does the age of an individual influence his drug consumption ?</li>
                <li>Does the impulsive behavior of an individual influence his drug consumption ?</li>
            </ul>

            <p>
                Let's use our data to isolate the strongest correlation between each features and each drug.
            </p>

            <p className={styles.secondTitle}>
                We start by observing the highest correlations between each drug and the features
            </p>
            <ShowCodeAlert text={codeCorrelation} textButtonTrigger={'show me the code!'}/>

            <p>
                This code snippet computes the 20 highest correlations between each drug and the known features. For
                example, the first line of the output shows that the correlation between the Sensation Seeking score and
                the
                Cannabis consumption is 0.45. This means that the higher the Sensation Seeking score, the more the
                person is
                likely to consume Cannabis.
            </p>

            <p>
                We can witness that the 20 highest correlations are not about age, country or ethnicity, but only about
                characteristics of the person.
            </p>

            <p>
                One of the feature seems to stand out: the SS, or Sensation Seeking score. It is the most correlated
                feature
                with the consumption of Cannabis, Legal highs, Ecstasy, Mushrooms, LSD, Nicotine, Amphetamines, and
                Coke.
            </p>

            <p>
                We may have found a key feature that influences the drug consumption of an individual.
            </p>

            <p>
                However, it is not clear yet, because this output separates the correlation of each feature and each
                drug,
                and we don't really care about a particular drug, right ?
            </p>

            <p>
                How could we find the most correlated feature with the drug consumption in general with this output ?
            </p>
            <Button variant="outline" className = {`text-black w-fit`}>Start Qcm</Button>
        </div>
    );
};

export const SlideCorrelationExplanation = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={styles.textMainStyle}>
            <p>
                One way to achieve that would be to compute for each feature the mean of the correlation with all drugs.
            </p>
            <ShowCodeAlert text={codePython} textButtonTrigger={'show me the code!'}/>

            <p>
                The mean correlation between the Sensation Seeking score and the drug consumption is 0.25. This is the
                highest mean correlation.
            </p>
            <Button onClick={() => setIsOpen(!isOpen)} variant="outline" className = {`text-black w-fit`}>?</Button>
                <div
                    style={{
                        opacity: isOpen ? 1 : 0,
                        visibility: isOpen ? 'visible' : 'hidden',
                        transition: 'opacity 300ms ease-in-out',
                        height: isOpen ? '0%' : '100%'
                    }}
                    className = {`bg-neutral-50 mx-[10%] p-4 w-fit rounded-md text-black`}>
                    <p>How to read this output ?</p>
                    <p>For each feature, we can see the mean correlation for all drugs. The higher the mean, the more the feature is correlated with drug consumption.</p>
                    <p>The mean correlation between the Sensation Seeking score and the drug consumption is 0.25. This is the highest mean correlation.</p>
                </div>

            <p>
                Once again, the sensation seeking score is ahead. It appears to be the most correlated feature with the drug
                consumption of an individual. The Impulsive score is the second most correlated feature. As you can see,
                features like the age or the country are not very correlated with the drug consumption.
            </p>
        </div>
    );
};

export const SlideEnding = () => {
    return (
        <div className={styles.textMainStyle}>
            <p className = {styles.secondTitle}>
                Let's plot this data, so we can visualize it in a better way !
            </p>
            <img src={correlationImg} className = {`max-w-3xl mx-auto`}/>
            <p className = {styles.secondTitle}>
                That's it for the analysis, remember that these are only observations and suppositions. We do not make any
                definitive statements about the data.
            </p>
            <p>
                Feel free to explore the charts by yourself and check the variety of drugs and features that the dataset
                offers. You may see some insights that we didn't see !
            </p>
        </div>
    );
};