
'use client';

import { useEffect, useState } from 'react';
import type { TestRecommendationOutput } from '@/ai/flows/test-recommendation-flow';
import { getTestRecommendation } from '@/app/actions';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Lightbulb, ChevronRight } from 'lucide-react';

interface AiRecommendationProps {
  performanceData: {
    subject: string;
    score: number;
  }[];
}

const AiRecommendation = ({ performanceData }: AiRecommendationProps) => {
    const [recommendation, setRecommendation] = useState<TestRecommendationOutput | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecommendation = async () => {
            if (!performanceData || performanceData.length === 0) {
                setLoading(false);
                return;
            }

            try {
                const overallScore = performanceData.reduce((acc, subject) => acc + subject.score, 0) / performanceData.length;
                const result = await getTestRecommendation({
                    userName: 'Ana',
                    overallScore: overallScore,
                    performanceBySubject: performanceData.map(({ subject, score }) => ({ subject, score })),
                });
                setRecommendation(result);
            } catch (error) {
                console.error("Failed to fetch AI recommendation:", error);
                setRecommendation(null);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendation();
    }, [performanceData]);

    if (loading) {
        return (
            <Card className="flex items-center gap-4 rounded-2xl p-4 shadow-sm">
                <Skeleton className="size-12 shrink-0 rounded-full" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
            </Card>
        )
    }

    if (!recommendation) return null;

    return (
        <Card className="flex items-center gap-4 rounded-2xl p-4 shadow-sm cursor-pointer hover:shadow-md">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Lightbulb className="size-7" />
            </div>
            <div className="flex flex-col flex-1">
                <p className="text-base font-semibold leading-normal text-card-foreground">{recommendation.topicToReview}</p>
                <p className="text-sm font-normal leading-normal text-muted-foreground">{recommendation.justification}</p>
            </div>
             <ChevronRight className="size-5 text-muted-foreground" />
        </Card>
    );
}

export default AiRecommendation;
