import SearchBar from "@/components/Search/SearchBar.jsx";
import SearchButton from "@/components/Search/SearchButton.jsx";
import cigarette from "@/assets/img/cigarette.png";
import mushroom from "@/assets/img/mushroom.png";
import pill from "@/assets/img/pill.png";
import { Card, CardContent } from "@/components/ui/card.jsx";
import { BarChartBig, LineChart, PieChart } from "lucide-react";
import { GraphDrawer } from "@/components/GraphDrawer.jsx";
import Graph from "@/components/Graph.jsx";
import useStore from "@/store/store.js";
import { FirstLetterUpperCase, ReplaceUnderscoreSpace } from "@/lib/utils";
import React, { useEffect } from "react";
import BubbleGlow from "@/components/BubbleGlow.jsx";
import { motion } from "framer-motion";
import { useShallow } from 'zustand/react/shallow';

const Dashboard = () => {
    const t = useStore(state => state.translations);
    const { 
        setDrugType, 
        drugTypePrettier, 
        consumptionType, 
        precisionConsumption, 
        chartType, 
        setApiData,
        screenSize 
    } = useStore(useShallow(state => ({
        setDrugType: state.setDrugType,
        drugTypePrettier: state.drugTypePrettier,
        consumptionType: state.consumptionType,
        precisionConsumption: state.precisionConsumption,
        chartType: state.chartType,
        setApiData: state.setApiData,
        screenSize: state.screenSize
    })));

    useEffect(() => {
        setApiData({
            data: {
                "used in last week": 271,
                "used in last day": 149,
                "used in last month": 121,
                "used in last year": 75,
                "never used": 14,
                "used in last decade": 13
            }
        })
    }, []);

    const handleDrugType = (newValue) => { setDrugType(newValue) }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    return (
        <main className="w-full flex-grow flex flex-col overflow-hidden bg-pdc-bg">
            <section className="relative w-full max-w-7xl mx-auto px-6 md:px-10 pt-32 pb-10 min-h-screen">
                <BubbleGlow />
                
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pdc-accent/5 blur-[120px] rounded-full pointer-events-none -mr-40 -mt-20" />
                
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col gap-10"
                >
                    {/* Header Section */}
                    <motion.div variants={itemVariants} className="z-10">
                        <p className="font-mono text-xs tracking-[0.3em] uppercase text-pdc-accent mb-4">
                            02 — {t.navbar?.dashboard || "Dashboard"}
                        </p>
                        <h1 className="text-4xl md:text-6xl font-bold font-display tracking-tight text-white mb-2 leading-tight">
                            {chartType !== 'consumption' 
                                ? FirstLetterUpperCase(chartType) + ' ' + ReplaceUnderscoreSpace(consumptionType) 
                                : ReplaceUnderscoreSpace(drugTypePrettier)}
                        </h1>
                        {chartType === 'consumption' && (
                            <p className="text-xl md:text-2xl font-semibold text-pdc-accent/80 tracking-tight">
                                {FirstLetterUpperCase(chartType)} {ReplaceUnderscoreSpace(consumptionType)} : {ReplaceUnderscoreSpace(precisionConsumption)}
                            </p>
                        )}
                    </motion.div>

                    {/* Search & Main Action Area */}
                    <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">
                        <motion.div variants={itemVariants} className="flex flex-col gap-6">
                            <div className="relative z-10 gap-4 bg-pdc-surface/40 p-4 rounded-2xl border border-pdc-border backdrop-blur-xl">
                                <p className={`text-gray-400 pb-1`}>{t.dashboard.drugExplanationSearch}</p>   
                                <div className="flex flex-wrap items-center gap-x-4">
                                    <SearchBar className="flex-grow" handleDrugType={handleDrugType} />
                                    <SearchButton className="rounded-xl " />
                                </div> 
                            </div>  

                            <Card className="bg-pdc-surface/20 border-pdc-border backdrop-blur-sm overflow-hidden shadow-2xl rounded-3xl z-0">
                                <CardContent className="p-0">
                                    <div className="bg-pdc-surface/40 p-2 border-b border-pdc-border flex items-center justify-between px-6 h-12">
                                        <div className="flex gap-1.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-pdc-danger/40" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-pdc-success/40" />
                                        </div>
                                        <span className="text-[10px] font-mono text-pdc-muted uppercase tracking-widest">LIVE DATA VIEW</span>
                                    </div>
                                    <div className="p-6 md:p-10 min-h-[400px] flex items-center justify-center">
                                        <Graph />
                                    </div>
                                </CardContent>
                            </Card>

                            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 justify-center lg:justify-start">
                                <GraphDrawer icon={<BarChartBig className="w-4 h-4 mr-2" />} typeOfChart="consumption" triggerTitle={t.dashboard.comparison} />
                                <GraphDrawer icon={<LineChart className="w-4 h-4 mr-2" />} typeOfChart="repartition" triggerTitle={t.dashboard.repartition} />
                                <GraphDrawer icon={<PieChart className="w-4 h-4 mr-2" />} typeOfChart="correlation" triggerTitle={t.dashboard.correlation} />
                            </motion.div>
                        </motion.div>

                        {/* Description & Info Panel */}
                        <motion.div variants={itemVariants} className="space-y-8 h-full">
                            <div className="bg-pdc-surface/40 p-8 rounded-3xl border border-pdc-border backdrop-blur-md h-full relative overflow-hidden group">
                                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-pdc-accent/10 blur-3xl rounded-full group-hover:bg-pdc-accent/20 transition-colors duration-700" />
                                
                                <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-pdc-accent pl-4">
                                    {t.dashboard.chartTypesTitle}
                                </h2>
                                
                                <ul className="space-y-4 mb-8">
                                    {t.dashboard.chartTypesList.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3 text-pdc-text/70">
                                            <span className="mt-2 h-1 w-1 rounded-full bg-pdc-accent flex-shrink-0" />
                                            <span className="text-sm leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                
                                <div className="space-y-4 text-sm text-pdc-muted leading-relaxed">
                                    <p className="hover:text-pdc-text transition-colors duration-300">
                                        {t.dashboard.comparisonChartDescription}
                                    </p>
                                    <p className="hover:text-pdc-text transition-colors duration-300">
                                        {t.dashboard.correlationHeatmapDescription}
                                    </p>
                                    <p className="hover:text-pdc-text transition-colors duration-300">
                                        {t.dashboard.repartitionChartDescription}
                                    </p>
                                </div>

                                {/* Floating Assets */}
                                <div className="mt-12 relative h-40 flex items-center justify-center">
                                    <img src={pill} className="h-24 absolute -left-4 -rotate-12 animate-jump opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700" alt="pill" />
                                    <img src={mushroom} className="h-28 absolute -bottom-4 rotate-6 animate-jump opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700 delay-150" alt="mushroom" />
                                    <img src={cigarette} className="h-24 absolute -right-4 top-0 rotate-12 animate-jump opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700 delay-300" alt="cigarette" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </section>
        </main>
    );
};

export default Dashboard;